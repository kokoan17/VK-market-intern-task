import styles from "./BagProduct.module.css";
import { useDispatch } from "react-redux";
import { deleteBagItem, updateCountById } from "../../state/bag/bagSlice";

const BagProduct = ({ item }: { item: BagProduct }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteBagItem({ id: itemId }));
  };

  const handleUpdate = (itemId: number, _increment: boolean) => {
    dispatch(updateCountById({ id: itemId, _increment: _increment }));
  };

  return (
    <>
      <div className={styles.bagProduct} key={item.id}>
        <div className={styles.bagProduct__title}>
          <img
            style={{ width: 100, height: 100 }}
            src={item.thumbnail}
            alt="img"
          />
          <p onClick={() => handleDeleteItem(item.id)}>{item.title}</p>
        </div>
        <div className={styles.bagProduct__info}>
          <div>
            <p>{item.quantity}</p>{" "}
            {item.quantity === 10 ? (<span>maximum count is 10!</span>) : item.quantity === 1 ? (<span>minimum count is 1!</span>) : null}
          </div>
          <button
            onClick={() => {
              item.quantity === 10 ? null : handleUpdate(item.id, true);
            }}
          >
            increment
          </button>
          <button
            onClick={() => {
              item.quantity === 1
                ? handleDeleteItem(item.id)
                : handleUpdate(item.id, false);
            }}
          >
            decrement
          </button>
        </div>
        <div className={styles.bagProduct__price}>
          <p>{item.price}</p>
        </div>
      </div>
    </>
  );
};

export default BagProduct;
