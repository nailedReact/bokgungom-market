import imageCompression from "browser-image-compression";

const actionImgCompress = async (fileSrc, isCompressedMore = false) => {
    const maxWidthOrHeightSet = isCompressedMore ? 200 : 400;
    const maxSizeMBSet = isCompressedMore ? 0.08 : 0.25;
    const options = {
        maxSizeMB: maxSizeMBSet,
        maxWidthOrHeight: maxWidthOrHeightSet,
        useWebWorker: true,
    };

    let submitFile = fileSrc;
    try {
        if (fileSrc.type !== "image/gif") {
            const compressedFile = await imageCompression(fileSrc, options);

            submitFile = new File([compressedFile], fileSrc.name, {
                type: fileSrc.type
            });
        } 
        return submitFile;
    } catch (error) {
        return submitFile;
    }
};

export default actionImgCompress;
