import React, { useState, useEffect } from "react";
import { AppLayout, FileUploadInput } from "../../_components";
import { Paper } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BasicImageList } from "./BasicImageList";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    width: "100%",
    height: "100vh",
    margin: "0px",
  },
  leftArea: {
    width: "50%",
  },
  rightArea: {
    width: "50%",
  },
}));

/**
 * 파일을 담아 서버로 전송할 변수와
 * imageList에 담아 web에서 파일을 보여줄 리스트를 각각 관리한다.
 *
 * imageList에 담을 객체를 imageObj객체 형태로 담은 후 list에 담는다.
 * 생성된 리스트를 props로 넘겨 imageList에서 보여줄 수 있도록 관리한다.
 *
 * files 는 서버로 전송할때 사용하기 때문에 imageList와 다른 객체들을 각 인덱스에 저장하지만
 * imageList와 같은 length를 가지고 있다.
 */
function ImageUploadPage() {
  const classes = useStyles();

  // 파일을 받을 변수
  const [files, setFiles] = useState([]);

  // 받은 파일을 이미지로 만들 변수
  // imageFiles는 하나의 file객체가 들어간다. 하지만 입력을 받을 때는 여러개의 fileList형태로 받으므로,
  // 입력을 받을 떄 마다 fileList에서 반복문을 돌며 파일을 꺼내 imageList에 넣어야 한다.
  const [imageFiles, setImageFiles] = useState([]);

  // 이미지 파일 원형 객체
  const imageObj = {
    fileUrl: "",
    fileCaption: "",
    fileName: "",
  };

  function handleFiles(fileList) {
    setFiles((file) => [...file, fileList]);
    let listTemp = [];

    // 파일리스트 만큼 반복문을 돌면서 file객체를 image객체로 가공한다.
    for (let i = 0; i < fileList.length; i++) {
      let image = { ...imageObj };
      image.fileUrl = URL.createObjectURL(fileList[i]);
      image.fileCaption = "";
      image.fileName = fileList[i].name;

      // 가공한 객체를 temp에 담는다.
      listTemp.push(image);
    }

    //temp에는 fileList로 담기기 때문에 반복문을 돌며 각 파일을 imageFiles에 담아야한다.
    listTemp.forEach((lt) =>
      setImageFiles((imageFiles) => [...imageFiles, lt])
    );

    // file객체의 원형을 리스트로 관리한다.
    setFiles(fileList);
  }

  function handleDeleteImage(e, file) {
    // 삭제하고자 하는 파일이 아닌 나머지 모든파일을 이미지리스트로 넣는다.
    setImageFiles((img) => img.filter((f) => f.fileUrl !== file.fileUrl));
    // 이미지가 삭제되면 서버로 제출 할 파일 리스트를 수정한다.
    setFiles((files) => [...files].filter((f) => f.name !== file.fileName));
  }

  return (
    <AppLayout>
      <div className={classes.wrap}>
        <div className={classes.leftArea}>
          <FileUploadInput handleUpload={handleFiles} />
        </div>
        <div className={classes.rightArea}>
          <BasicImageList
            items={imageFiles}
            handleDeleteImage={handleDeleteImage}
          />
          {/* {files.map((file) => {
            console.log(file);
            return <p>{file[0].name}</p>;
          })} */}
        </div>
      </div>
    </AppLayout>
  );
}

export { ImageUploadPage };
