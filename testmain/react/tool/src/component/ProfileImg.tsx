import { useState, useRef } from 'react';
import styled from 'styled-components';
import SvgButton from './SvgButton';
import mainImage from '../images/mainImage.png';

const BaseImage = styled.img`
    width: 250px;
    height: 250px;
    margin: 25px 0 0 0;
    border: 1px solid white;
    border-radius: 70%;
    overflow: hidden;
    object-fit: cover;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    user-drag: none;
    -webkit-touch-callout: none;
`;

const BaseFileDiv = styled.div`
    display: grid;
    grid-template-rows: 270px 40px;
    justify-items: center;
`;

const BaseFileInput = styled.input`
    display: none;
`;

export default function ProfileImg({ isDisabled, setAvator }: { isDisabled: boolean, setAvator: React.Dispatch<React.SetStateAction<string>> }) {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const imageFileUpLoad = () => {
        fileRef.current?.click();
    }

    const fileChange = (e: any) => {
        let reader = new FileReader();

        reader.onload = () => {
            const previewImgUrl = reader.result;
            if (previewImgUrl) {
                setImageUrl(previewImgUrl.toString());
                setAvator(previewImgUrl.toString());
            }
        }
        
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImageFile(e.target.files[0]);
        }
    }


    return (
        <BaseFileDiv>
            <BaseImage src={imageFile === null ? mainImage : imageUrl} />
            <div>
                <BaseFileInput accept={'image/jpg,image/png,image/jpeg'} type='file' id='fileInput' name='profileImg' ref={fileRef} onChange={fileChange} />
                <SvgButton onClick={imageFileUpLoad} svgName='CameraSvg' isDisabled={isDisabled} />
            </div>
        </BaseFileDiv>);
}