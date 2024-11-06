const Product = require('../models/Product')
const ProductDetail = require('../models/ProductDetail')
const ProductAttribute = require('../models/ProductAttribute')
const Seller = require('../models/Seller')
const Warranty = require('../models/Warranty')
const Brand = require('../models/Brand')
const Multimedia = require('../models/Multimedia')
const ProductSpecDetails = require('../models/ProductSpecDetails')
const createCustomError = require('../../utils/customError')
const validator = require('validator')

exports.postProduct = async (req, next) => {
  let productAttributeIDs = []
  let productDetailIDs = []
  try {
    const {
      fname,
      ename,
      category,
      brand,
      images = [],
      description,
      original,
    } = req.body
    productAttributeIDs = await saveAttributes(req, next)
    productDetailIDs = await saveDetails(req, next)
    if (productAttributeIDs.length > 0 && productDetailIDs.length > 0) {
      if (validator.isEmpty(fname)) {
        throw createCustomError('نام فارسی خالی است', 400)
      }
      if (validator.isEmpty(ename)) {
        throw createCustomError('نام انگلیسی خالی است', 400)
      }
      if (validator.isEmpty(category)) {
        throw createCustomError('نام دسته بندی خالی است', 400)
      }
      if (validator.isEmpty(description)) {
        throw createCustomError('توضیحات محصول خالی است', 400)
      }
      if (validator.isEmpty(original)) {
        throw createCustomError('تصویر اصلی محصول خالی است', 400)
      }
      if (!(await Brand.findById(brand))) {
        throw createCustomError('برند محصول خالی است', 400)
      }
      if (images.length === 0) {
        throw createCustomError('البوم تصاویر خالی است', 400)
      } else {
        for (let index = 0; index < images.length; index++) {
          const element = images[index]
          if (!(await Multimedia.findById(element))) {
            throw createCustomError(
              `تصویر ${index + 1} از آلبوم تصاویر وجود ندارد`,
              400
            )
          }
        }
      }

      const pID = await Product.create({
        fname,
        ename,
        category,
        brand,
        images,
        attributes: productAttributeIDs,
        details: productDetailIDs,
        description,
        original,
      })
      return pID
    } else {
      throw createCustomError(
        'در بخش آرایه های ویژگی و جزئیات خطایی بوجود آمده است',
        500
      )
    }
  } catch (error) {
    await productAttributesDelete(productAttributeIDs)
    await productDetailsDelete(productDetailIDs)
    console.error(error)
    next(error)
  }
}

exports.getProduct = async (req, next) => {
  try {
    const { fields } = req.query
    const { productId, page = 1, limit = 10 } = req.body
    const fieldItems = fields ? fields.split(',').join(' ') : ''
    if (productId != null) {
      const product = await Product.findById(productId)
      return [product]
    } else {
      const product = await Product.paginate(
        {},
        {
          page,
          limit,
          select: fieldItems,
          populate: [
            { path: 'category' },
            { path: 'brand' },
            { path: 'images' },
            { path: 'attributes' },
            { path: 'details' },
          ],
        }
      )
      return product.docs
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.updateProduct = async (req, next) => {
  try {
    const { addSeller, productId } = req.body
    if (addSeller) {
      const attrIdArr = await saveAttributes(req, next)
      const pId = await Product.findByIdAndUpdate(
        productId,
        { $push: { attributes: attrIdArr[0] } },
        { new: true, runValidators: true }
      )
      return [pId]
    } else {
      let updateAttrIds = (await saveAttributes(req, next, 'update')) || []
      return updateAttrIds
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const saveAttributes = async (req, next, status = 'create') => {
  try {
    const { attributes } = req.body

    if (attributes.length == 0) {
      throw createCustomError('هیچ مشخصه ای برای محصول ثبت نشده است', 400)
    }
    let attrArr = []
    let dataArr = []
    let idAttrUpdate = []

    if (status === 'update') {
      let prod = await Product.findById(req.body.productId)
      console.log('prod', prod)
      idAttrUpdate = prod.attributes
    }

    for (let index = 0; index < attributes.length; index++) {
      const element = attributes[index]
      const sellerId = await Seller.findById(element.seller)
      const warrantyId = await Warranty.findById(element.warranty)

      if (sellerId == null) {
        throw createCustomError(`فروشنده ${index + 1} وجود ندارد`, 404)
      }
      if (warrantyId == null) {
        throw createCustomError(`گارانتی ${index + 1} وجود ندارد`, 404)
      }

      if (validator.isEmpty(element.color)) {
        throw createCustomError(`رنگ ${index + 1} خالی است`, 400)
      }

      dataArr.push({
        color: element.color,
        stock: element.stock,
        price: element.price,
        discount: element.discout,
        warranty: element.warranty,
        seller: element.seller,
      })
    }

    if (dataArr.length == attributes.length) {
      for (let index = 0; index < dataArr.length; index++) {
        const element = dataArr[index]
        const idAttr =
          status === 'create'
            ? await ProductAttribute.create({
                color: element.color,
                stock: element.stock,
                price: element.price,
                discount: element.discout,
                warranty: element.warranty,
                seller: element.seller,
              })
            : await ProductAttribute.findByIdAndUpdate(
                idAttrUpdate[index],
                {
                  $set: {
                    color: element.color,
                    stock: element.stock,
                    price: element.price,
                    discount: element.discout,
                    warranty: element.warranty,
                    seller: element.seller,
                  },
                },
                { new: true, runValidators: true }
              )
        attrArr.push(idAttr)
      }
    }
    return attrArr
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const saveDetails = async (req, next) => {
  try {
    const { details } = req.body
    if (details.length == 0) {
      throw createCustomError('هیچ جزئیاتی برای محصول وارد نشده است', 400)
    }
    let detailArr = []
    let dataArr = []
    for (let index = 0; index < details.length; index++) {
      const element = details[index]
      const valueId = await ProductSpecDetails.findById(element.detail)

      if (valueId == null) {
        throw createCustomError(`جزئیات ${valueId.name} مقدار ندارد`, 404)
      }

      if (validator.isEmpty(element.value)) {
        throw createCustomError(`مقدار ${valueId.name} خالی است`, 400)
      }
      dataArr.push({
        detail: element.detail,
        value: element.value,
        label: element.label,
      })
    }
    if (dataArr.length == details.length) {
      for (let index = 0; index < dataArr.length; index++) {
        const element = dataArr[index]
        const idDet = await ProductDetail.create({
          detail: element.detail,
          value: element.value,
          label: element.label,
        })
        detailArr.push(idDet)
      }
    }
    return detailArr
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const productAttributesDelete = async (attributeIDs) => {
  for (let index = 0; index < attributeIDs.length; index++) {
    const element = attributeIDs[index]
    await ProductAttribute.deleteOne({ _id: element })
  }
  return
}
const productDetailsDelete = async (detailIDs) => {
  for (let index = 0; index < detailIDs.length; index++) {
    const element = detailIDs[index]
    await ProductDetail.deleteOne({ _id: element })
  }
  return
}
