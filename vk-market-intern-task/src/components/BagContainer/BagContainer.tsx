import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {
  calculateTotals,
  deleteAllBagItems,
  fetchBagItems,
} from "../../state/bag/bagSlice";
import BagProduct from "../BagProduct/BagProduct";
import { AppDispatch, RootState } from "../../state/store";
import { Button, Panel, PanelHeader, View } from "@vkontakte/vkui";

const BagContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBagItems());
  }, [dispatch]);

  const { items, amount, isLoading } = useSelector(
    (state: RootState) => state.bag
  );

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items]);

  if (isLoading) {
    return (
      <View activePanel="bagProducts">
        <Panel id="bagProducts">
          <PanelHeader>Ваша корзина</PanelHeader>
          <p>Загрузка...</p>
        </Panel>
      </View>
    );
  }

  if (amount < 1) {
    return (
      <View activePanel="bagProducts">
        <Panel id="bagProducts">
          <PanelHeader>Ваша корзина</PanelHeader>
          <p>Упс, ваша корзина пуста...</p>
        </Panel>
      </View>
    );
  }

  return (
    <View activePanel="bagProducts">
      <Panel id="bagProducts">
        <PanelHeader>Ваша корзина</PanelHeader>
        {items.map((item, index) => (
          <BagProduct key={item.id} item={item} ind={index} />
        ))}
        <div style={{ marginBottom: 20 }}>
          <Button onClick={() => dispatch(deleteAllBagItems())}>
            Удалить все товары
          </Button>
        </div>
      </Panel>
    </View>
  );
};

export default BagContainer;
