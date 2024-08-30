import { Avatar, Button, Flex, List, Typography } from 'antd'
import React from 'react'
import './Activity.css'

const data = [
    {
        name: "Emm Turner",
        orderTime: 1,
    },
    {
        name: "Liam Foster",
        orderTime: 2,
    },
    {
        name: "Olivia Read",
        orderTime: 3,
    },
    {
        name: "Ethan Hayes",
        orderTime: 4,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
    {
        name: "Ava Simons",
        orderTime: 5,
    },
]

const Activity = () => {
  return (
    <div className="activity">
    <Flex vertical gap="small">
      <Flex align='center'justify='space-between' gap='large'>
        <Typography.Title level={3} className='primary--color'>
            Recent Activity
        </Typography.Title>
        <Button type='link' className='gray--color'>
            View All
        </Button>
      </Flex>

      <List pagination={{pageSize: 15}} dataSource={data} renderItem={(user, index) => (
        <List.Item>
            <List.Item.Meta avatar={<Avatar src={'https://api.dicebear.com/7.x/miniavs/svg?seed?seed=${index}'}/>}
            title={<a href='#'>{user.name}</a>}></List.Item.Meta>
            <span className='gray--color'>
                {user.orderTime} {user.orderTime==1 ? 'day ago' : 'days ago'}
            </span>
        </List.Item>
      )}/>
    </Flex>
    </div>
  )
}

export default Activity;