import React, { useState } from 'react'
// import { UNSPLASH_ACCESS_KEY } from "../config"

function SearchImage() {
    const [query, setQuery] = useState('');
    const [image, setImage] = useState([]);




    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(` https://api.unsplash.com/search/photos?query=${query}&client_id=gkVjAza_1Dn-zm9lRrVFj2xx-2m6rTk2jAEA9_MPOWw`);

            const data = await response.json();
            setImage(data.results);
            console.log(data);
        } catch (error) {
            console.log(error, "somthing went wrong");

        }

    };
    const changeHandler = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <div>
                <h1>Image Search Application </h1>
                <form onSubmit={submitHandler}>
                    <input type="text"
                        placeholder='Enter Your Image '
                        value={query}
                        onChange={changeHandler}
                    />
                    <button type='submit' >Search</button>
                </form>
            </div>
            <div>
                {image.map((image) => (
                    <div key={image.id}>
                        <img src={image.urls.small} alt={image.description} />
                        <p>{image.description || "No Description available"}</p>
                    </div>

                ))}
            </div>

        </div>
    );

};
export default SearchImage
