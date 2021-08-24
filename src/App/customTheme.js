import {createMuiTheme, responsiveFontSizes} from '@material-ui/core'
import {koKR} from '@material-ui/core/locale';
import {createTheme} from '@material-ui/core/styles'

// const primary = {
//   light: '#e5ff85',
//   main:'#5ad954',
//   dark: '#2ac534',
//   contrastText:'#fff'
// }

// const secondary = {
//   main: '#ff916c'
// }

// const error = {
//   light:'#ffb1b1',
//   main:'#f36666'
// }

const text = {
    primary: "#4b4d54",
    secondary: "#cbd0d3",
    light: '#f8f7f2'
}

export let customTheme = createTheme({
    palette: {
        // primary: primary,
        // secondary: secondary,
        // error: error,
        // success: primary,
        text: text
    },
    overrides: {
        // MuiButton:{
        //   root:{
        //     borderRadius:30,
        //     fontWeight:'700'
        //   },
        //   outlined:{
        //     border:'1px solid #e4e0d4',
        //     color:'#e4e0d4'
        //   },
        //   '& hover':{
        //     // color:'#fff',
        //     // backgroundColor:
        //   }
        // },

        // MuiTextField:{
        //   root:{
        //     '& fieldset':{
        //       borderRadius:25
        //     }
        //   }
        // },
        // MuiOutlinedInput:{
        //   input:{
        //     padding:'16.5px 14px'
        //   }
        // },
        // MuiFilledInput:{
        //   root:{
        //     backgroundColor:'#fbfbfb',
        //     borderTopRightRadius:'none',
        //     borderTopLeftRadius:'none',
        //     borderRadius:25,
        //     fontWeight:'600',
        //     '&:hover':{
        //       // backgroundColor:"red"
        //     },
        //     '&.Mui-focused':{
        //       backgroundColor:"#eaeaea"
        //     }
        //   },


        //   input:{
        //     padding:'1rem'
        //   },

        //   underline: {
        //     '&:hover':{
        //       '&:before':{
        //         borderBottom:'none'
        //       },
        //       '&:after':{
        //         borderBottom:'none'
        //       }
        //     },
        //     '&:before':{
        //       borderBottom:'none'
        //     },
        //     '&:after':{
        //       borderBottom:'none'
        //     }
        //   }
        // },

        // MuiFormControlLabel:{
        //   label:{
        //     color:"#cbd0d3",
        //     fontWeight:'800',
        //   }
        // },

        // MuiToggleButtonGroup:{
        //   root:{
        //     flexWrap: 'wrap',
        //     justifyContent:'flex-start',
        //   },
        //   grouped: {
        //     margin: '0.3rem',
        //     padding: '0.5rem',
        //     border: 'none',
        //     justifyContent:'center',

        //     "&&.MuiToggleButton-root": {
        //       marginLeft:'0.3rem',
        //       border:'1px solid #f8f7f2',
        //       backgroundColor:'#fff',
        //       borderRadius:25,
        //       color: '#4b4d54',
        //       "&&.Mui-selected": {
        //         marginLeft:'0.3rem',
        //         backgroundColor: '#5ad954',
        //         color: '#fff'
        //       },
        //     },
        //   },
        // },

        // MuiTabs:{
        //    root:{
        //     width:'50%',
        //   },
        //   indicator: {
        //     display: 'flex',
        //     justifyContent: 'center',
        //     backgroundColor: 'transparent',

        //     height:'0.3rem',
        //     '& > span': {
        //       maxWidth: 50,
        //       width: '100%',
        //       borderRadius:'30px',
        //       backgroundColor: '#5ad954',
        //     },
        //   },

        //   flexContainer:{
        //     justifyContent:'center',
        //     '& button':{
        //       minWidth:'6rem',
        //       padding:0,
        //       margin:0
        //     }
        //   }
        // },
        // MuiTab:{
        //   root: {
        //     textTransform: 'none',
        //     fontWeight: '700',
        //     // fontSize: '1rem',
        //     marginRight: '1rem',
        //     '&:focus': {
        //       opacity: 1,
        //     },
        //   },

        // },

        // MuiCard:{
        //   root:{
        //     borderRadius:25
        //   }
        // },
        // MuiMenu:{
        //   paper:{
        //     borderRadius:25
        //   }
        // },
        // // display,여백,크기,색상,폰트
        // MuiMenuItem:{
        //   root:{
        //     display:'flex',
        //     justifyContent: 'center',
        //     margin:'.3rem',
        //     padding:"1rem",
        //     color:'#a6adb4',
        //     fontSize:"16px",
        //     fontWeight:'bold'
        //   }

        // },
        // MuiPaper:{
        //   elevation1:{
        //     boxShadow:'none'
        //   },
        //   elevation24:{
        //     boxShadow: "0px",
        //   }
        // },
        // MuiDialog:{
        //   paper:{
        //     borderRadius:20
        //   },

        // },
        // MuiAccordion:{
        //   root:{
        //     '&:before': {
        //       height: '0'
        //     },
        //   }
        // },
    },
    props: {
        // MuiButton:{
        //   // disableRipple:true
        // }
    }
    // typography:{
    //   fontFamily: 'Nanum Godic',
    //   fontWeightLight: 400,
    //   fontWeightRegular: 500,
    //   fontWeightMedium: 600,
    //   fontWeightBold: 700,
    // }
}, koKR)

responsiveFontSizes(customTheme);