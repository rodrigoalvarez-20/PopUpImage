import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { PropertyFieldChoiceGroupWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldChoiceGroupWithCallout';
import PopupWindow from './components/PopupWindow';
import { IPopupWindowProps } from './components/IPopupWindowProps';



export interface IPopupWindowWebPartProps {
  title: string;
  url: string;
  align : string;
}

export default class PopupWindowWebPart extends BaseClientSideWebPart<IPopupWindowWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPopupWindowProps > = React.createElement(
      PopupWindow,
      {
        title : this.properties.title,
        url : this.properties.url,
        align: this.properties.align
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configuracion del PopUp"
          },
          groups: [
            {
              groupName: "Ajustes",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Introduzca el nombre del documento/imagen"
                }),
                PropertyPaneTextField('url', {
                  label: "Introduzca el link"
                }),
                PropertyFieldChoiceGroupWithCallout('align', {
                  calloutContent: React.createElement('div', {}, 'Seleccione la alineacion del boton'),
                  key: 'alignOptions',
                  label: 'Alineacion del boton:',
                  options: [{
                    key: 'left',
                    text: 'Izquierda',
                    checked: this.properties.align === 'left'
                  }, {
                    key: 'right',
                    text: 'Derecha',
                    checked: this.properties.align === 'right'
                  }, {
                    key: 'center',
                    text: 'Centro',
                    checked: this.properties.align === 'center'
                  }]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
