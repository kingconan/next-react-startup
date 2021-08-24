import React, {useState} from 'react'
import {Affix, Dropdown, Menu} from "antd";
import Link from 'next/link'

export default function BasicLayout({ current_path, children }) {
    const menus = [
        {
            name: 'Homepage',
            router: '/quality_platform/home',
        },
        {
            name: 'Performance testing',
            router: '/quality_platform/performance_testing',
        },
        {
            name: 'E2E automation',
            router: '/quality_platform/e2e_automation',
        },
        {
            name: 'Feature Flag',
            router: '/quality_platform/feature_flag',
        }
    ]
    return (
        <>
            <div className="root">
                <Affix offsetTop={0}>
                    <div className={'left'}>
                        <div className={'menu_title'}>Quality Platform</div>
                        <div className={'divider'} />
                        <div className={'menu'}>
                            {
                                menus.map((item, i) => {
                                    return <div key={'div'+i} className={'menu_item'}>
                                        <Link href={item['router']} key={i}>
                                            <a className={current_path === item['router'] ? 'menu_selected' : 'menu'}>{item['name']}</a>
                                        </Link>
                                    </div>
                                    }
                                )
                            }
                        </div>
                    </div>
                </Affix>
                <div className={'right'}>
                    <Affix offsetTop={0}>
                        <div className={'top'}>
                            <div className={'top_right'}>Guest</div>
                        </div>
                    </Affix>
                    <div className={'main'}>{children}</div>
                </div>
            </div>
            <style jsx>{`
                .root {
                    display:flex;
                    background: #fff;
                    width:100%;
                    height:100vh;
                }
                .left {
                    transition: 100ms;
                    min_width: 200px;
                    height: 100vh;
                    background: #fff;
                }
                .right {
                    width: 100%;
                    height: 100vh;
                    border: 1px solid #f0f0f0
                }
                .menu_item {
                    padding:10px 20px;
                }
                .menu:hover {
                    color: #5139f2;
                }
                .menu {
                    color: #1f1f1f;
                }
                .menu_selected {
                    color: #5139f2;
                }
                
                .menu_title {
                    font-weight: bolder;
                    height:60px;
                    background: #5139f2;
                    color: #ffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .divider {
                    height:1px;
                    width:100%;
                    background: #f0f0f0;
                }
                
                .top {
                    display: flex;
                    height: 60px;
                    background: #fff;
                    border-bottom: 1px solid #f0f0f0
                }
                .top_right {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding-right:20px;
                }
                .main {
                    
                }
            `}
            </style>
        </>
    )
}