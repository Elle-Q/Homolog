import React, {useState} from 'react';

function InfiniteSpace(props) {
    const  [apods, setApods]= useState();

    window.onscroll = debounce(() => {
        const {
            loadApods
        } = this;

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadApods();
        }
    }, 100);

    const loadApods = () => {
        request
            .get('http://localhost:8089/app/category/list')
            .then((result) => {
                const nextApod = {
                    ID: result.data.ID,
                    Title: result.data.Title,
                    SubTitle: result.data.SubTitle,
                    Preview: result.data.Preview,
                    Desc: result.data.Desc,
                };
                setApods([...apods,nextApod]);
            });
    }

return (
        <div>
            <h1>Infinite Space!</h1>
            <p>Scroll down to load more!!</p>
        </div>
    );
}

export default InfiniteSpace;