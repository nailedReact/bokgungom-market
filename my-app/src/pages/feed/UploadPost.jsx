import { useState } from "react";
export default function UploadPost() {
    const [showImages, setShowImages] = useState([]);

    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }

        setShowImages(imageUrlLists);
    };

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    return (
        <div className="App">
            <form action="">
                <label>게시물 내용</label>
                <textarea placeholder="게시글 입력하기..." />
            </form>
            {showImages.map((image, id) => (
                <div key={id}>
                    <img src={image} alt={`${image}-${id}`} />
                    <span onClick={() => handleDeleteImage(id)}>x</span>
                </div>
            ))}
            <input type="file" multiple onChange={handleAddImages}></input>
            <button type="submit">업로드</button>
        </div>
    );
}
