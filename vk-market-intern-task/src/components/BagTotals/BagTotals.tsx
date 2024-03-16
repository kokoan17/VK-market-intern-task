import { Group, Panel, PanelHeader, SimpleCell } from "@vkontakte/vkui"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"


const BagTotals = () => {
    const { amount, total } = useSelector((state: RootState) => state.bag)
  return (
    <Panel id="bagTotals" style={{height: "100vh", position: "relative"}}>
        <PanelHeader>Total</PanelHeader>
        <Group style={{position: "fixed", top: 65}}>
            <SimpleCell>
                <p>final amount: {amount}</p>
                <p>total price: {total}$</p>
            </SimpleCell>
        </Group>
    </Panel>
  )
}

export default BagTotals