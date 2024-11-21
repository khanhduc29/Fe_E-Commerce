/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Menu, MenuProps, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { api } from "../../../../api/api"
import { BlogItemType } from "../../types/blog.types"
import dayjs from "dayjs"
const { Text } = Typography
type MenuItem = Required<MenuProps>['items'][number];

const itemsCate: MenuItem[] = [
  {
    key: 'sub1',
    label: 'CATEGORIES',
    icon: null,
    style: { color: '#000', fontWeight: 500, backgroundColor: '#fff' },
    children: [
      {
        key: 'Category 1',
        label: 'Category 1',
      },
      {
        key: 'Category 2',
        label: 'Category 2',
      },
      {
        key: 'Category 3',
        label: 'Category 3',
      }
    ],
  },
];

const Blog = () => {
  const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3'])
  const [blogs, setBlogs] = useState<BlogItemType[]>([])
  const [cateSelected, setCateSelected] = useState<string>('Category 1')

  useEffect(() => { 
    // Fetch categories

    setCategories(['Category 1', 'Category 2', 'Category 3'])
    api.get('/blog').then((res) => {
      setBlogs(res.data.updatedBlog)
    })
  }
  , [])

  const onClick: MenuProps['onClick'] = (e) => {
    setCateSelected(e.key)
  };

  return (
    <Row className="container" style={{ flexDirection: 'column', margin: '24px auto 58px', height: 'auto' }}>
      <Row style={{ flexDirection: 'column' }} align={'middle'} justify={'center'}>
        <Text style={{ color: '#000', fontSize: 30, fontWeight: 600 }}>Blogs</Text>
        <Row style={{ marginTop: 30, gap: 30 }}>
          {categories.map((category, index) => (
            <Text style={{ fontSize: 16, fontWeight: 500, color: '#000', cursor: 'pointer' }} onClick={() => setCateSelected(category)} key={index}>{category}</Text>
          ))}
        </Row>
      </Row>
      <Row gutter={50} style={{ marginTop: 80 }}>
        <Col span={8}>
        <Row
              style={{ flexDirection: 'column', gap: 30 }}
              className="custom-menu-item-selected"
            >
              <Menu
                onClick={onClick}
                style={{
                  width: '100%',
                  minWidth: '140px',
                  background: 'inherit',
                  borderInlineEnd: 'none',
                  color: '#f03333',
                  border: '1px solid #e9e9e9',
                  borderRadius: '10px',
                }}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={itemsCate}
                theme="light"
                selectedKeys={[cateSelected || '']}
              />

              {/* <Menu
                onClick={onClick}
                style={{
                  width: '100%',
                  minWidth: '140px',
                  background: 'inherit',
                  borderInlineEnd: 'none',
                  color: '#f03333',
                  border: '1px solid #e9e9e9',
                  borderRadius: '10px',
                }}
                defaultOpenKeys={['sub2']}
                mode="inline"
                items={itemsAvailable}
                theme="light"
              /> */}
            </Row>
        </Col>
        <Col span={16}>
          <Row gutter={[30, 40]}>
            {blogs.map((blog, index) => (
              <Col span={index % 3 == 0 ? 24 : 12} key={index}>
                <Row>
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: 600 }} />
                </Row>
                <Row style={{ flexDirection: 'column', marginTop: 15 }}>
                  <Text style={{ fontSize: 12, color: '#636363', marginBottom: 5 }}>{dayjs(blog.createdAt).format("MMM DD, YYYY")}</Text>
                  <Text style={{ fontSize: 35, fontWeight: 500, color: '#000', lineHeight: 1.3, marginBottom: 15 }} className="hover-primary-color">{blog.title}</Text>
                </Row>
                <Divider style={{ width: 90, minWidth: 0, margin: '0 0 15px', backgroundColor: '#d5d5d5', color: '#d5d5d5' }}/>
                <Row style={{ flexDirection: 'column' }} align={'top'}>
                  <Text style={{ fontSize: 14, color: '#000' }}>{blog.description}</Text>
                  <Button variant="solid" color="default" style={{ fontSize: 12, color: '#fff', marginTop: 15, lineHeight: '40px', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 30px', borderRadius: 5, transition: 'all 0.3s ease', height: 40 }}>Read more</Button>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Row>
  )
}

export default Blog