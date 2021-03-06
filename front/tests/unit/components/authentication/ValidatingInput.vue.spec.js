import { createWrapper, disableFile, cutFromOptions, mapProperties } from "../../__utils__";
import Component from "@/components/authentication/ValidatingInput";

disableFile();

describe("authentication/ValidatingInput.vue", () => {
  let wrapper, input;
  const mountWrapper = (options = {}) => {
    const { props } = cutFromOptions(options, ["props"]);
    wrapper = createWrapper(Component, {
      props: {
        pattern: /[a-z]+/,
        value: "za",
        ...props,
      },
      ...options,
    });
    input = wrapper.find("input");
  };

  it("Testing snapshot", () => {
    mountWrapper({
      props: mapProperties("title"),
      computed: {
        show: mapProperties("icon", true),
        icon: mapProperties("className", "title", "context"),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  describe("Triggering events", () => {
    it("onInput", () => {
      mountWrapper({
        methods: ["onInput"],
      });

      input.setValue("some value");

      expect(wrapper.vm.onInput).toBeCalledWith("some value");
    });
  });

  describe("Testing computed properties", () => {
    describe("show", () => {
      it("show.icon = true", () => {
        mountWrapper({
          data: {
            activated: true,
          },
        });

        expect(wrapper.vm.show.icon).toBeTruthy();
      });

      it("show.icon = false", () => {
        mountWrapper({
          data: {
            activated: false,
          },
        });

        expect(wrapper.vm.show.icon).toBeFalsy();
      });
    });

    describe("valid", () => {
      it("valid = true", () => {
        mountWrapper({
          props: {
            pattern: /[a-z]+/,
            value: "az",
          },
        });

        expect(wrapper.vm.valid).toBeTruthy();
      });

      it("valid = true", () => {
        mountWrapper({
          props: {
            pattern: /[0-9]+/,
            value: "az",
          },
        });

        expect(wrapper.vm.valid).toBeFalsy();
      });
    });

    describe("icon", () => {
      it("icon = valid", () => {
        mountWrapper({
          data: {
            "icons.valid": "valid icon",
          },
          computed: {
            valid: true,
          },
        });

        expect(wrapper.vm.icon).toBe("valid icon");
      });

      it("icon = failed", () => {
        mountWrapper({
          data: {
            "icons.failed": "failed icon",
          },
          computed: {
            valid: false,
          },
        });

        expect(wrapper.vm.icon).toBe("failed icon");
      });
    });
  });

  describe("Testing methods", () => {
    it("onInput", () => {
      mountWrapper({
        data: {
          activated: false,
        },
      });
      const stubFunction = jest.fn();
      wrapper.vm.$on("new-value", stubFunction);

      wrapper.vm.onInput("some value");

      expect(wrapper.vm.activated).toBeTruthy();
      expect(stubFunction).toBeCalledWith("some value");
    });
  });

  describe("Testing watch", () => {
    it("mode", () => {
      mountWrapper({
        data: {
          activated: true,
        },
      });
      const stubFunction = jest.fn();
      wrapper.vm.$on("new-value", stubFunction);

      wrapper.setProps({ mode: "new mode" });

      expect(stubFunction).toBeCalledWith("");
      expect(wrapper.vm.activated).toBeFalsy();
    });
  });
});
