import React from "react";
import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";

const TwoDropDown = () => {
  return (
    <div>
      <div className={`font-18 normal-text pb8`}>hello</div>
      <Input.Group compact className="input-style bordercolor--border border2 br8 font-18 normal-text px10 py8 mb32">
        <Select defaultValue="Option1-1" >
          <Option value="Option1-1" className="py8">Option1-1</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
        <Select defaultValue="Option2-2">
          <Option value="Option2-1">Option2-1</Option>
          <Option value="Option2-2">Option2-2</Option>
        </Select>
      </Input.Group>
		</div>
  );
};

export default TwoDropDown;
