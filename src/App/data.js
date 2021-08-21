import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ShowChartIcon from '@material-ui/icons/ShowChart';

/**
 * data.js는 app전체에서 공통적으로 사용되는 static data를 정의한 공간이다.
 * 아이콘과 같은 컴포넌트 자체를 넘겨서 사용할 수 도 있기 때문에 /App아래 위치하고 있다. 
 */

//TODO: _script로 페이지를 생성하면 자동으로 메뉴를 추가해주는 script를 생성할 것.
// 현재 shell로 사용중이나, window 호환성과 편리한 문법을 위해
// python으로 정의하는게 보다 편할듯 보인다.
export const menus = [
  {
    title: "ImageUploadPage",
    path: "/image_upload",
    imgUrl: "",
    icon: (<CloudUploadIcon/>),
    color: "#000",
    subMenus: [],
  },
  {
    title: "CanvasPage",
    path: "/canvas",
    imgUrl: "",
    icon: (<CropOriginalIcon/>),
    color: "#000",
    subMenus: [],
  },
  {
    title: "D3PracticePage",
    path: "/d3_practice",
    imgUrl: "",
    icon: (<CropOriginalIcon/>),
    color: "#000",
    subMenus: [
      {
        title: "Circle",
        path: "/d3_practice/circle",
        icon: (<RadioButtonUncheckedIcon/>),
        imgUrl: "",
      },
      {
        title: "Line Chart",
        path: "/d3_practice/line_chart",
        icon: (<ShowChartIcon/>),
        imgUrl: "",
      },
    ],
  },
];