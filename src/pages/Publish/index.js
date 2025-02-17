import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, useSearchParams } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI, getArticleDataAPI} from '@/apis/article'
import {  useEffect, useRef, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'
  const { Option } = Select
  
  const Publish = () => {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [form] = Form.useForm()
    useEffect(() => {
      const fetchArticleData = async()=> {
        const res = await getArticleDataAPI(id);
        const { cover, ...formValue } = res.data
        // 设置表单数据
        form.setFieldsValue({ ...formValue, type: cover.type })
        setImageType(cover.type);
        setImageList(cover.images.map(url => {return {url}}));

      }
      fetchArticleData();
    }, [id, form])
 
    const {channels} = useChannel();
    const onFinish = (formValue) =>{
        if(imageList.length !== imageType) return message.warning("图片类型与数量不一致");
        const {channels_id, content, title} = formValue;
        const params = {
            channels_id, content, title,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response.data.url)
              },
        }
        createArticleAPI(params);

    }
    const [imageList, setImageList] = useState([]);
    const onUploadChange = (info) => {
        setImageList(info.fileList);
        cacheImageList.current = info.fileList;
    }
    const [imageType, setImageType] = useState(0);
    const onTypeChange = (e) => {
        setImageType(e.target.value);
        if(imageType === 1) {
            const imgList = cacheImageList.current[0]?[cacheImageList.current[0]]:[];
            setImageList(imgList);
        } else if (imageType === 3) {
            //三图
            setImageList(cacheImageList.current);
        }
    }

    //上传图片
    const cacheImageList = useRef([]);

    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '发布文章' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 0 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channels.map(item =><Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item label="封面">
                <Form.Item name="type">
                    <Radio.Group onChange={onTypeChange}>
                    <Radio value={1}>单图</Radio>
                    <Radio value={3}>三图</Radio>
                    <Radio value={0}>无图</Radio>
                    </Radio.Group>
                </Form.Item>
              { imageType>0 && <Upload
                    listType="picture-card"
                    showUploadList
                    name='image'
                    action={'http://geek.itheima.net/v1_0/upload'}
                    onChange={onUploadChange}
                    maxCount={imageType}
                    fileList={imageList}
                    multiple={imageType > 1}
                >
                    <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                    </div>
                </Upload>}
                </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
            <ReactQuill
            className="publish-quill"
            theme="snow"
            placeholder="请输入文章内容"
            />                
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish