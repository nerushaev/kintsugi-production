import { Input } from "../../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDelivery } from "../../../../redux/auth/auth-operations";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliveryDataSchema } from "../../../../helpers/deliveryDataSchema";
import {
  selectResponse,
  selectError,
} from "../../../../redux/auth/auth-selectors";
import {
  CustomForm,
  InputsWrapper,
  ButtonWrapper,
  Button,
  ErrorMessage,
} from "../../../Form/Form.styled";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  getCities,
  getWarehouses,
} from "../../../../redux/nova/nova-operation";

import { selectCitiesLoading, selectNovaState, selectWarehousesLoading } from "../../../../redux/nova/nova-selectors";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import {
  removeCitiesList,
  removeWarehousesList,
  selectCity,
  selectCityWarehouse,
  selectWarehouse,
} from "../../../../redux/nova/nova-slice";
import { useAuth } from "../../../../hooks/useAuth";
import useDebounce from "../../../../hooks/useDebounce";
import { SmallLoader } from "../../../SmallLoader/SmallLoader";

export const OptionsWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Options = styled.p`
  padding: 5px 0px;
  width: 100%;
  border: 1px solid ${theme.colors.darkBlue};
  // border-radius: 6px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.ligthGray};
  }
`;

export default function DeliveryData({ user }) {
  const dispatch = useDispatch();
  const { delivery } = user;
  const nova = useSelector(selectNovaState);
  const {
    cities,
    city,
    warehouse,
    warehouses,
    cityWarehouse,
  } = nova;

  const error = useSelector(selectError);
  const response = useSelector(selectResponse);
  const loadingCities = useSelector(selectCitiesLoading);
  const loadingWarehouses = useSelector(selectWarehousesLoading);
  const { isLoggedIn } = useAuth();

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(deliveryDataSchema),
    defaultValues: {
      city: delivery ? delivery.city : "",
      warehouse: delivery ? delivery.warehouse : "",
    },
  });

  const { watch, setValue } = methods;

  const cityInput = useDebounce(watch("city"), 500);
  const cityInputNow = watch("city");
  const warehouseInput = useDebounce(watch("warehouse"), 500);
  const warehouseInputNow = watch("warehouse");

  const [userEdit, setUserEdit] = useState(
    cityInput && warehouseInput ? false : true
  );

  const onSubmit = methods.handleSubmit(async (data) => {
    setUserEdit(false);
    dispatch(updateUserDelivery(nova));
    dispatch(removeCitiesList([]));
    dispatch(removeWarehousesList([]));
  });

  const handleCityClick = (item) => {
    setValue("city", item.Present);
    dispatch(selectCity({ city: item.Present, cityRef: item.Ref }));
    dispatch(selectCityWarehouse(item.MainDescription));
    dispatch(removeCitiesList());
  };

  const handleWarehouseClick = (item) => {
    setValue("warehouse", item.Description);
    dispatch(selectWarehouse(item));
    dispatch(removeWarehousesList());
  };

  const handleEditButton = () => {
    setValue("city", "");
    setValue("warehouse", "");
    setUserEdit(true);
    dispatch(removeCitiesList([]));
    dispatch(removeWarehousesList([]));
  };

  useEffect(() => {
    if (cityInputNow?.length === 0) {
      dispatch(removeCitiesList());
      return;
    }

    if (cityInput?.length >= 2 && city !== cityInputNow) {
      dispatch(getCities(cityInput));
    }
  }, [cityInput, cityInputNow, city, dispatch]);

  useEffect(() => {
    if (warehouseInputNow?.length === 0) {
      dispatch(removeWarehousesList());
      return;
    }

    if (warehouseInput?.length >= 1 && warehouse !== warehouseInputNow) {
      dispatch(
        getWarehouses({ city: cityWarehouse, warehouse: warehouseInput })
      );
    }
  }, [warehouseInput, warehouseInputNow, warehouse, dispatch, cityWarehouse]);



  const city_input = {
    name: "city",
    label: "Місто або селище",
    type: "text",
    id: "city",
    placeholder: "Ведіть назву міста або селища...",
    disabled: !userEdit,
  };

  const warehouse_input = {
    name: "warehouse",
    label: "Номер відділення",
    type: "text",
    id: "warehouse",
    placeholder: "Введіть номер відділення...",
    disabled: !userEdit,
  };

  return (
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper>
        <div>
            <Input {...city_input}/>
            <OptionsWrapper>
              {loadingCities && <SmallLoader />}
            {cities &&
              userEdit &&
              cities.map((item) => {
                const { Present, Ref } = item;
                return (
                  <Options key={Ref} onClick={() => handleCityClick(item)}>
                    {Present}
                  </Options>
                );
              })}
          </OptionsWrapper>
          </div>
          <div>
            <Input {...warehouse_input} />
            <OptionsWrapper>
            {loadingWarehouses && <SmallLoader />}
            {warehouses &&
              userEdit &&
              warehouses.map((item) => {
                const { Description, Ref } = item;
                return (
                  <Options key={Ref} onClick={() => handleWarehouseClick(item)}>
                    {Description}
                  </Options>
                );
              })}
          </OptionsWrapper>
          </div>
        </InputsWrapper>
        {isLoggedIn && (
          <ButtonWrapper>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <ErrorMessage>Пароль успішно змінено!</ErrorMessage>}
            {userEdit ? (
              <Button onClick={onSubmit}>
                <FaExchangeAlt />
                Зберегти зміни
              </Button>
            ) : (
              <Button
                $accent
                onClick={handleEditButton}>
                <FaExchangeAlt />
                Змінити відділення
              </Button>
            )}
          </ButtonWrapper>
        )}
      </CustomForm>
    </FormProvider>
  );
}
