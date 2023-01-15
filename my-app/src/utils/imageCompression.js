import imageCompression from "browser-image-compression";

const actionImgCompress = async (fileSrc, isProfile = false) => {
    const maxWidthOrHeightSet = isProfile ? 200 : 400;
    const maxSizeMBSet = isProfile ? 0.08 : 0.25;
    const options = {
        maxSizeMB: maxSizeMBSet,
        maxWidthOrHeight: maxWidthOrHeightSet,
        useWebWorker: true,
    };

    try {
        console.log(`압축 전: ${fileSrc.size}`);
        console.log("압축 처리중!");
        const compressedFile = await imageCompression(fileSrc, options);
        console.log(`압축 후: ${compressedFile.size}`);
        return compressedFile;
    } catch (error) {
        console.log(error);
    }
};

export default actionImgCompress;
