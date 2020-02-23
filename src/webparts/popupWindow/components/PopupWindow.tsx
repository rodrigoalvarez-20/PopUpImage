import * as React from 'react';
import { IPopupWindowProps } from './IPopupWindowProps';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IconButton,
  PrimaryButton,
  Image, ImageFit, DialogType
} from 'office-ui-fabric-react';

import { FontSizes } from '@uifabric/styling';
import {isMobile } from 'react-device-detect';


const theme = getTheme();
const iconButtonStyles = mergeStyleSets({
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px'
  },
  rootHovered: {
    color: theme.palette.neutralDark
  }
});
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      fontSize: FontSizes.xLarge,
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '8px 8px 10px 12px'
    }
  ]
});

class PopupWindow extends React.Component<IPopupWindowProps, any> {
  constructor(props){
    super(props);
    this.state = {
      showModal:false,
      window_size : Number
    };
  }

  public componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', ()=>{ this.setState({ window_size: window.innerWidth }); });
  }
  
  public componentWillUnmount() {
    window.removeEventListener('resize', ()=>{ this.setState({ window_size: window.innerWidth }); });
  }
  
  public updateWindowDimensions() {
    this.setState({ window_size: window.innerWidth });
  }

  public renderImage() : JSX.Element {
    return (
      <div style={{ width:"650px", height:"40wh", padding:"6px" }}>
        <Image src={this.props.url}
          imageFit = {ImageFit.contain}
          width="100%"
          height="75vmin"
          style={{ 
            textAlign:"center" 
          }} />
      </div>
    );
  }
  
  public render(): React.ReactElement<IPopupWindowProps> {
    var div_style;
    if (this.props.align === "right"){
      div_style = {
        width:'100%',
        textAlign: 'right'
      };
    }else if (this.props.align === "left"){
      div_style = {
        width:'100%',
        textAlign: 'left'
      };
    }else {
      div_style = {
        width:'100%',
        textAlign: 'center'
      };
    }
    return (
      <div style={div_style}>
        <PrimaryButton text={this.props.title}
          onClick={()=>{
            if (isMobile || this.state.window_size < 650){
              window.open(`${this.props.url}`, "_blank");
            }else {
              this.setState({ showModal:true });
            }
          }} />      
        <Modal
          isOpen={this.state.showModal}
          onDismiss={()=>{ this.setState({ showModal:false }); }}
          isBlocking={true}
          containerClassName={contentStyles.container} >
            <div className={contentStyles.header}>
              <IconButton
                styles={iconButtonStyles}
                iconProps={{ iconName: 'Cancel' }}
                onClick={()=>{ this.setState({ showModal:false }); }} />
            </div>
            {
              this.renderImage()
            }
          </Modal>
      </div>
    );
  }


}

export default PopupWindow;
