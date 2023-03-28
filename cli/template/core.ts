import { upperFirst } from "./utils";
const genCoreTemplate = (name: string) => {
  const compName = "S" + upperFirst(name);
  const propsTypeName = upperFirst(name) + "Props";
  const propsName = name + "Props";
  const propsFileName = name + "-type";
  const className = "s-" + name;
  return `\
import { defineComponent } from "vue";
import { ${propsTypeName}, ${propsName} } from "./${propsFileName}";
export default defineComponent({
  name: "${compName}",
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    return () => {
      return <div class="${className}"></div>;
    };
  },
});
`;
};

export default genCoreTemplate;
