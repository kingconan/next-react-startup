import { Table, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch'
export default function PT_Summary() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(async () => {
        setLoading(true);
        let ret = await fetch('/fake_api/latest_runs');
        let json = await ret.json();
        if(json.code === 0){
            setData(json.obj);
        }
        else{
            console.log(json)
        }
        setLoading(false);
    }, []);
    const columns = [
        {
            title: 'Simulation',
            dataIndex: 'simulation',
            key: 'simulation',
        },
        {
            title: '99th response time',
            dataIndex: 'rt_99',
            key: 'rt_99',
        },
        {
            title: '95th response time',
            dataIndex: 'rt_95',
            key: 'rt_95',
        },
        {
            title: 'TPS',
            dataIndex: 'tps',
            key: 'tps',
        },
        {
            title: 'Env',
            dataIndex: 'env',
            key: 'env',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ]

    return (
        <>
            <div style={{'padding': '0px 30px'}}>
                <div className={'description'}>
                    <p>The framework is based on Gatling [link:https://gatling.io/] which is designed for ease of use, maintainability and high performance.</p>
                    <p> Documentation <br/>
                        - Code repository: <br/>
                        - How to add a simulation:
                    </p>
                </div>
                <div>
                    <div style={{'padding':'20px 0px', 'color': '#aaa'}}>Latest test results</div>
                    <div>
                        {loading && <div className={'loading'}><Spin /></div>}
                        {!loading && data.length > 0 && <Table
                            columns={columns}
                            dataSource={data}
                        />}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .loading {
                    width:100%;
                    text-align: center;
                    padding:120px 0px;
                }
            `}</style>
        </>
    )
}