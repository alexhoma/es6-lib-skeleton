import {h} from "preact";
import {App} from "../src/index"
import {shallow} from "preact-render-spy";


describe("<App>", () => {
   it('should render', () => {
       const tree = shallow(<App name={"world"} />);

       expect(tree).toMatchSnapshot();
   })
});