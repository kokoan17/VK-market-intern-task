import { ConfigProvider } from "@vkontakte/vkui";
import { AdaptivityProvider } from "@vkontakte/vkui";
import { AppRoot } from "@vkontakte/vkui";
import { SplitLayout } from "@vkontakte/vkui";
import { SplitCol } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import BagContainer from "./components/BagContainer/BagContainer";
import BagTotals from "./components/BagTotals/BagTotals";

const App = () => {
  return (
    <>
      <ConfigProvider appearance="light">
        <AdaptivityProvider>
          <AppRoot mode="full">
            <div>
              <SplitLayout style={{display: "flex", flexDirection: "row", gap: 20}} aria-valuemax={560}>
                <SplitCol width={600}>
                  <BagContainer />
                </SplitCol>
                <SplitCol width={200}>
                  <BagTotals />
                </SplitCol>
              </SplitLayout>
            </div>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </>
  );
};

export default App;
