import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateProduct } from "../../../../../redux/products/products-operation";
import { theme } from "../../../../../styles/theme";
import { Button, ButtonWrapper } from "../../../../Buttons/Buttons";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DropzoneContainer = styled.div`
  background-color: ${theme.colors.ligthGray};
  padding: 30px 20px;
  border: 1px solid lightgray;
  border-radius: 6px;
  position: relative;

  margin-bottom: 10px;
`;

const AdminContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 6px;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Input = styled.input`
  display: none;
`;

const CustomInput = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  gap: 10px;
`;

const ImageItem = styled.li`
  flex: 0 0 48%;
  max-width: 48%;
  position: relative;
  display: block;
  height: 180px;
  margin-bottom: 20px;
  @media (min-width: 767px) {
    height: 280px;
  }
`;

const Image = styled.img`
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default function Dropzone(props) {
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!e.target.photo_extra.value) {
      return;
    }
    const formData = new FormData(e.target);
    const { _id } = props;
    dispatch(updateProduct({ formData, _id }));
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const newData = [];
    if (file.length !== 0) {
      newData.push(...file);
    }
    for (const file of files) {
      setFile((prev) => {
        
        newData.push(URL.createObjectURL(file));
        return newData;
      });
    }
  };

  const handleRemove = (data) => {
    console.log(data);
    const result = file.filter(item => {
      return item !== data;
    })
    setFile(result);
  }

  return (
    <AdminContainer>
      <form
        name="form"
        method="put"
        encType="multipart/form-data"
        onSubmit={handleClick}
      >
        <DropzoneContainer>
          <CustomInput htmlFor="photo_extra">
            Drop images here
            <Input
              onChange={handleChange}
              type="file"
              id="photo_extra"
              name="photo_extra"
              multiple
            />
          </CustomInput>
        </DropzoneContainer>
        <ImageList>
          {file.map((item) => {
            return (
              <>

              <ImageItem key={item}>
              <IconWrapper onClick={() => handleRemove(item)}><IoMdCloseCircleOutline style={{fontSize: "24px"}} /></IconWrapper>
                <ImageWrapper>
                  <Image id="blah" src={item} alt="" />
                </ImageWrapper>
              </ImageItem>
              </>
            );
          })}
        </ImageList>
        <ButtonWrapper>
          <Button type="submit">Додати</Button>
        </ButtonWrapper>
      </form>
    </AdminContainer>
  );
}
