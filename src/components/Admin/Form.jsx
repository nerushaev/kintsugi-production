import { Form } from "../Admin/Fields";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addProducts } from "../../redux/products/products-operation";
import { ButtonWrapper, Button } from "../Buttons/Buttons";
import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { addProductValidation } from "../../helpers/addProductValidation";
import { Notify } from "notiflix";

const Select = styled.select`
  width: 100%;
  height: 40px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: ${theme.fontSizes.small};
`;

const FieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const Option = styled.input`
  margin-right: 5px;
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  flex-basis: calc((100% - 20px) / 2);
`;

export const OptionsWrapper = styled.div`
  display: flex;
  width: 280px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const Category = styled.p`
  margin: 0 auto;
  margin-bottom: 20px;
`;

export default function FormAddProducts() {
  const loading = true;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    addProductValidation
      .validate(formDataObj)
      .then((res) => {
        for (let k of formData) {
          if ((k[0] === "_id") & (k[1] === "")) {
            formData.delete(k[0]);
          }
        }
        dispatch(addProducts(formData));
        for (let k of e.target) {
          k.value = ''
          k.checked = false;
        }
      })
      .catch((er) => {
        Notify.failure(er.message);
      });
  };

  const inputId = nanoid();

  return (
    <Form
      name="form"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <FieldWrapper>
        <Input
          placeholder="Назва товару"
          name="name"
          id="formName"
          type="text"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Input
          placeholder="Кількість"
          name="amount"
          id={inputId}
          type="number"
        />
      </FieldWrapper>
      <FieldWrapper>
        <Input
          placeholder="Ціна за одиницю"
          name="price"
          id={inputId}
          type="number"
        />
      </FieldWrapper>
      <Category>Категорія</Category>
      <OptionsWrapper>
        <Select title="wigs" name="category">
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
      </OptionsWrapper>
      <FieldWrapper>
        <Input
          placeholder="Опис товару"
          name="description"
          id={inputId}
          type="text"
        />
      </FieldWrapper>
      <FieldWrapper>
        <label>Зображення</label>
        <Input name="image" id={inputId} type="file" multiple required />
      </FieldWrapper>
      <Category>Розміри</Category>
      <OptionsWrapper>
        <OptionWrapper>
          <Option name="size" value="S" type="checkbox" />
          <label>S</label>
        </OptionWrapper>
        <OptionWrapper>
          <Option name="size" value="M" type="checkbox" />
          <label>M</label>
        </OptionWrapper>
        <OptionWrapper>
          <Option name="size" value="L" type="checkbox" />
          <label>L</label>
        </OptionWrapper>
        <OptionWrapper>
          <Option name="size" value="XL" type="checkbox" />
          <label>XL</label>
        </OptionWrapper>
        <OptionWrapper>
          <Option name="size" value="XXL" type="checkbox" />
          <label>XXL</label>
        </OptionWrapper>
        <OptionWrapper>
          <Option name="size" value="XXXL" type="checkbox" />
          <label>XXXL</label>
        </OptionWrapper>
        <OptionWrapper>
          <Option name="size" value="-" type="checkbox" />
          <label>Без розміру</label>
        </OptionWrapper>
      </OptionsWrapper>
      <ButtonWrapper>
        <Button $isLoading={loading} type="submit">
          Add product
        </Button>
      </ButtonWrapper>
      {/* <ButtonWrapper>
          <Button onClick={handleUpdate}>Update product</Button>
          </ButtonWrapper> */}
    </Form>
  );
}
