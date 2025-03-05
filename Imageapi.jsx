import React, { useState } from "react";

const Imageapi = () => {
    const [image, setImage] = useState("");
    const [imageDetails, setImageDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    let changeHandler = (e) => {
        setImage(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (!image.trim()) {
            setError("Please Enter Image name ");
            setLoading(false);
        }
        try {

            // console.log("hello");

            const response = await fetch(`https://api.unsplash.com/search/photos?query=${image}`);

            if (!response.ok) {
                throw new Error('Image Not Found, Please Enter a Correct Image Name...');
            }

            let data = await response.json();
            console.log(data);
            setImageDetails(data.results);
            setLoading(false);

        } catch (error) {
            setError(error.message || "Something Went Wrong");
            console.log(error.message);
            setLoading(false);
            return;
        }
    };









    return (
        <>
            <div className="container">
                <h1>Image Genaretor Application</h1>
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Enter Search Image ..."
                        value={image}
                        onChange={changeHandler}
                    />
                    <button type="submit">Get Image</button>
                </form>

                {loading && <span imageName="loading">Loading Image Details...</span>}
                {error && <span imageName="error">{error}</span>}
                <div>
                    {imageDetails.map((img) => (
                        <div key={img.id} >
                            <img src={img.urls.small} alt="Not Found" />
                        </div>

                    ))}
                </div>

            </div>
        </>
    );
};

export default Imageapi;