import { useDispatch } from "react-redux";
import { deleteBagItem, updateCountById } from "../../state/bag/bagSlice";
import {
  Button,
  Group,
  Header,
  Image,
  Panel,
  SimpleCell,
  Spacing,
  View,
} from "@vkontakte/vkui";
import { Icon20Add, Icon20MinusOutline, Icon36Delete } from "@vkontakte/icons";

const BagProduct = ({ item, ind }: { item: BagProduct; ind: number }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteBagItem({ id: itemId }));
  };

  const handleUpdate = (itemId: number, _increment: boolean) => {
    dispatch(updateCountById({ id: itemId, _increment: _increment }));
  };

  return (
    <>
      <View activePanel="BagProduct">
        <Panel id="BagProduct">
          <Group header={<Header>Item {ind + 1}</Header>}>
            <SimpleCell before={<Image src={item.thumbnail} size={75}></Image>}>
              <div>
                <p>{item.title}</p>
                <Spacing size={12} />
                <p>{item.price}$</p>
              </div>
            </SimpleCell>
            <SimpleCell
              after={
                <Icon36Delete
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ cursor: "pointer" }}
                />
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Button
                  before={<Icon20MinusOutline />}
                  onClick={() => {
                    item.quantity === 1
                      ? handleDeleteItem(item.id)
                      : handleUpdate(item.id, false);
                  }}
                ></Button>
                {item.quantity}
                <Button
                  before={<Icon20Add />}
                  onClick={() => {
                    item.quantity === 10 ? null : handleUpdate(item.id, true);
                  }}
                ></Button>
              </div>
              {item.quantity === 1 ? (<p style={{color: "#EF2D56"}}>minimum count is 1</p>) : item.quantity === 10 ? (<p style={{color: "#EF2D56"}}>maximum count is 10</p>) : null}
            </SimpleCell>
          </Group>
        </Panel>
      </View>
    </>
  );
};

export default BagProduct;
