import { List, Skeleton } from "antd";
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


const ListQuestion = ({ keyDataQuestions }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo') // api + `/${keyDataQuestions}`
            // fetch({url})
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 280,
                width: 930,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <div className="grid grid-rows-2 grid-flow-col">

                                <div class="col-span-2" style={{ fontSize: 19, fontWeight: 400, width: 750 }}>
                                    Nội dung câu hỏi
                                </div>
                                <div class="row-span-2 col-span-2" style={{ fontWeight: 400, width: 750 }}>
                                    Nội dung câu trả lời
                                </div>
                                <div class="row-span-3" style={{ marginTop: '10%' }}>
                                    <button style={{ fontSize: 14, backgroundColor: '#52d6ff', padding: '2px 5px', borderRadius: 5 }}>
                                        Chỉnh sửa
                                    </button>
                                    <button style={{ fontSize: 14, marginLeft: 10, backgroundColor: '#ff5656', padding: '2px 5px', borderRadius: 5 }}>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>)
}

export default ListQuestion