import Web3Helper from '@/helper/Web3Heper';
import { Button, Divider, Card, Input, Space, InputNumber, Form } from 'antd';
let web3 = Web3Helper.instance();

export default function MintPanel(props: {}) {
  const onFinish = async (values: any) => {
    console.log('表单值:', values);
    Web3Helper.createStdERC20(values).then((res) => {
      alert('发币成功' + JSON.stringify(res));
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card title="浏览器一键发币" className="mt-3">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          _erc20_template_: '0x159288596c68ddc8a97e18ecdd3d2eb0d6b21616',
          totalSupply: 10086,
          name: 'TinTin Lesson7 NFT',
          symbol: '7NFT',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ERC20 模板地址"
          name="_erc20_template_"
          rules={[{ required: true, message: '模板地址可设为 0x159288596C68dDc8a97E18ECdd3d2eB0d6b21616' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="总数量" name="totalSupply" rules={[{ required: true, message: '认真混圈，仔细填写' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="货币名称" name="name" rules={[{ required: true, message: '认真混圈，仔细填写' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="货币符号" name="symbol" rules={[{ required: true, message: '认真混圈，仔细填写' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            发币
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
