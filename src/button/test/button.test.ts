import { render } from "@testing-library/vue";
import SpButton from "../src/button";

test("test button", () => {
  const { getByRole } = render(SpButton);
  getByRole("button");
});

// 测试插槽
test("test default slot content", () => {
  const { getByText } = render(SpButton);
  getByText("content");
});

test("test default slot", () => {
  const { getByText } = render(SpButton, {
    slots: {
      default: () => "修改默认插槽内容",
    },
  });
  getByText("修改默认插槽内容");
});

// 测试props
test("default type should be secondary", () => {
  const { getByRole } = render(SpButton);
  const button = getByRole("button");
  expect(button.classList.contains("s-btn--secondary")).toBe(true);
});

test("test props type", () => {
  const { getByRole } = render(SpButton, {
    props: {
      type: "primary",
    },
  });
  const button = getByRole("button");
  expect(button.classList.contains("s-btn--primary")).toBe(true);
});

test("test props disabled", () => {
  const { getByRole } = render(SpButton, {
    props: {
      disabled: true,
    },
  });
  const button = getByRole("button") as HTMLButtonElement;
  expect(button.disabled).toBe(true);
});
