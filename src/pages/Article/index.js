import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { delArticleAPI, getArticlesAPI } from '@/apis/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker
const Article = () => {
     // 准备列数据
    const navgate= useNavigate()
     const status = {
        1: <Tag color="green">待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
     } 
     const onConfirm = async(data) =>{
        await delArticleAPI(data.id);
        setReqData({
          ...reqData
        })
     }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {

        console.log(data);
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navgate(`/publish?id=${data.id}`)} />
            <Popconfirm title="删除文章" description="确认删除当前文章吗？" onConfirm={()=> onConfirm(data)}
                okText="Yes"
                cancelText="No"
                >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
            </Popconfirm>
            
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  const [data, setData] = useState({})
  const [reqData, setReqData] = useState({
    status: '',
    channels_id: "",
    begin_pubdate: "",
    end_pubdate:'',
    page:1,
    per_page:4
  })
  useEffect(() => {
    const fetchArticles= async() =>{
        const res = await getArticlesAPI(reqData);
        setData(res.data);
    }
    fetchArticles();
  }, [reqData])

  const articles = data.results;
  const count = data.total_count;
  const{ channels} = useChannel();

  const onFinish = (formValue) => {
    setReqData({
        ...reqData,
        channels_id:formValue.data,
        status:formValue.status,
        begin_pubdate:formValue.data[0].format("YY-MM-DD"),
        end_pubdate: formValue.data[1].format('YY-MM-DD')
    })
  }

  const pageChange = (page) => {
    console.log(page)
    setReqData({
        ...reqData,
        page
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' , channel_id: ''}} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
                {channels.map(item =>  <Option key={item.id} value={item.id}>{item.name}</Option>)}
            
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <div>
      {/*        */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articles}
        pagination={{
            current:reqData.page,
            pageSize:reqData.per_page,
            onChange:pageChange,
            total:count
        }}
        />
      </Card>
    </div>
    </div>
  )
}

export default Article