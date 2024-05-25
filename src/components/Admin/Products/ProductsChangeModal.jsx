import styled from 'styled-components';
import React, { useMemo, useState } from 'react';
import { theme } from '../../../styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../../../redux/products/products-selectors';
import CustomTagsInput from './CustomTagsInput';
import { Option, OptionsWrapper, OptionWrapper } from '../Form';
import { Button } from '../../Buttons/Buttons';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { updateProduct } from '../../../redux/products/products-operation';

const Title = styled.p`
  text-align: center;
  margin-bottom: 10px;
`;

const Container = styled.div`
  padding: 18px;
  width: 540px;
  height: 100%;
  // margin: 0 auto;
  // margin-bottom: 50px;

`;

const FormWrapper = styled.form`
padding: 16px;
  background-color: white;
`;

const Input = styled.input`
  height: 40px;
  padding: 5px 10px;
  width: 100%;
  font-size: ${theme.fontSizes.small};
  // font-family: "Montserrat";
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 60px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-height: 200px;
  margin-bottom: 5px;
`;

export const ItemsWrapper = styled.div`
  flex: 1 1 0;
`;

const ImageWrapper = styled.div`
  margin-right: 10px;
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Select = styled.select`
  height: 40px;
  padding: 5px 10px;
  width: 100%;
  font-size: ${theme.fontSizes.small};
`;

const MoreButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${theme.colors.formButton};
  margin-bottom: 20px;
`;

export default function ProductsChangeModal({closeModal, data}) {
  const { name, amount, price, category, size, _id, image, tags, sizeInformation = "" } = data;


  const dispatch = useDispatch();
  //MEMO
  const oldName = useMemo(() => name, [name]);
  const oldAmount = useMemo(() => amount, [amount]);
  const oldPrice = useMemo(() => price, [price]);
  const oldSize = useMemo(() => size, [size]);
  const oldSizeInformation = useMemo(() => sizeInformation, [sizeInformation]);
  //STATE
  const [productName, setProductName] = useState(name);
  const [productNameChange, setProductNameChange] = useState(false);

  const [amountProduct, setAmountProduct] = useState(amount);
  const [amountProductChange, setAmountProductChange] = useState(false);

  const [priceProduct, setPriceProduct] = useState(price);
  const [priceProductChange, setPriceProductChange] = useState(false);

  const [sizes, setSizes] = useState(size);

  const [sizeInfo, setSizeInfo] = useState(sizeInformation);

  const [isMoreInfoActive, setIsMoreInfoActive] = useState(true);

  const loading = useSelector(selectIsLoading);


  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "productName":
        setProductName(value);
        setProductNameChange(true);
        break;
      case "amountProduct":
        setAmountProduct(value);
        setAmountProductChange(true);
        break;
      case "priceProduct":
        setPriceProduct(value);
        setPriceProductChange(true);
        break;
      case "categoryProduct":
        dispatch(updateProduct({ category: value, _id }));
        break;
      case "sizeInfo":
        setSizeInfo(value);
        break;
      default:
        break;
    }
  };

  const handleSizes = (e) => {
    const { value } = e.target;
    if (sizes.length >= 1 && sizes.includes(value)) {
      const newSizes = sizes.filter((el) => el !== value);
      setSizes(newSizes);
    } else {
      setSizes([...sizes, value]);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    switch (id) {
      case "productName":
        dispatch(updateProduct({ name: productName, _id }));
        break;
      case "amountProduct":
        dispatch(updateProduct({ amount: amountProduct, _id }));
        break;
      case "priceProduct":
        dispatch(updateProduct({ price: priceProduct, _id }));
        break;
      default:
        break;
    }
  };

  const handleClickCancel = (e) => {
    const { id } = e.currentTarget;

    switch (id) {
      case "productName":
        setProductName(oldName);
        setProductNameChange(false);
        break;
      case "amountProduct":
        setAmountProduct(oldAmount);
        setAmountProductChange(false);
        break;
      case "priceProduct":
        setPriceProduct(oldPrice);
        setPriceProductChange(false);
        break;
      default:
        break;
    }
  };

  const handleSubmitSize = () => {
    dispatch(updateProduct({ size: sizes, _id }));
  };

  const handleSubmitSizeInfo = () => {
    dispatch(updateProduct({ sizeInformation: sizeInfo, _id }));

  }

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  }

  return (
    <Container>
      <FormWrapper>
      <p onClick={closeModal}>close</p>
      <InputField>
        <Input
          type="text"
          name="productName"
          value={productName}
          onChange={handleChange}
        />
        {productNameChange && (
          <>
            <CancelOutlinedIcon id="productName" onClick={handleClickCancel} />
            <CheckCircleOutlineOutlinedIcon
              id="productName"
              onClick={handleClick}
            />
          </>
        )}
      </InputField>
        <ImageWrapper>
          <Image src={image[0]} />
        </ImageWrapper>
            <InputField>
              <Label htmlFor="amountProduct">Кількість</Label>
              <Input
                type="number"
                name="amountProduct"
                value={amountProduct}
                onChange={handleChange}
              />
              {amountProductChange && (
                <>
                  <CancelOutlinedIcon
                    id="amountProduct"
                    onClick={handleClickCancel}
                  />
                  <CheckCircleOutlineOutlinedIcon
                    id="amountProduct"
                    onClick={handleClick}
                  />
                </>
              )}
            </InputField>
            <InputField>
              <Label htmlFor="priceProduct">Ціна</Label>
              <Input
                type="number"
                name="priceProduct"
                value={priceProduct}
                onChange={handleChange}
              />
              {priceProductChange && (
                <>
                  <CancelOutlinedIcon
                    id="priceProduct"
                    onClick={handleClickCancel}
                  />
                  <CheckCircleOutlineOutlinedIcon
                    id="priceProduct"
                    onClick={handleClick}
                  />
                </>
              )}
            </InputField>
          <InputField>
            <Select
              name="categoryProduct"
              defaultValue={category}
              onChange={handleChange}
            >
              <option name="wigs" value="wigs">Перуки</option>
          <option name="costume" value="costume">Костюми</option>
          <option name="accessories" value="accessories">Аксессури</option>
          <option name="smallStand" value="smallStand">Маленькі стенди</option>
          <option name="bigStand" value="bigStand">Великі стенди</option>
          <option name="pendant" value="pendant">Підвіски</option>
          <option name="pin" value="pin">Піни</option>
          <option name="hairpins" value="hairpins">Шпильки</option>
          <option name="earrings" value="earrings">Сережки</option>
          <option name="tapestries" value="tapestries">Гобелени</option>
          <option name="other" value="other">Інше</option>
            </Select>
          </InputField>
        {/* </MainInputsWrapper> */}
      {/* </MainWrapper> */}
      <MoreButton onClick={() => setIsMoreInfoActive(!isMoreInfoActive)}>
        Додаткова інформація
      </MoreButton>
      {isMoreInfoActive && (
        <>
          <Title>Теги</Title>
          <CustomTagsInput _id={_id} oldTags={tags} loading={loading}/>
          <Title>Розміри</Title>
          {size && (
            <>
              <OptionsWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="S"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("S")}
                  />
                  <label>S</label>
                </OptionWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="M"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("M")}
                  />
                  <label>M</label>
                </OptionWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="L"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("L")}
                  />
                  <label>L</label>
                </OptionWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="XL"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("XL")}
                  />
                  <label>XL</label>
                </OptionWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="XXL"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("XXL")}
                  />
                  <label>XXL</label>
                </OptionWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="XXXL"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("XXXL")}
                  />
                  <label>XXXL</label>
                </OptionWrapper>
                <OptionWrapper>
                  <Option
                    name="sizeProduct"
                    value="-"
                    type="checkbox"
                    onChange={handleSizes}
                    checked={sizes.length >= 1 && sizes.includes("-")}
                  />
                  <label>One size</label>
                </OptionWrapper>
              </OptionsWrapper>
              <Button $margin onClick={handleSubmitSize}>Зберегти</Button>
              <InputField>
              <Input name="sizeInfo" onChange={handleChange} value={sizeInfo} placeholder="Додаткова інформація про розміри"/>
              </InputField>
              <Button onClick={handleSubmitSizeInfo}>Зберегти</Button>
              <Button $delete onClick={() => handleDelete(_id)}>Видалити товар</Button>
            </>
          )}
        </>
      )}
      </FormWrapper>
    </Container>
  )
}
