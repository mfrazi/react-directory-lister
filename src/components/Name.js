import React from 'react';

export default class Name extends React.Component {
   constructor(props) {
       super(props);
   }

   render() {
       return(
           <div>
               <h5 className='hideOverflow'>
                   <img className='file-icon' width='20' height='33' src={this.props.iconPath} />
                   <samp>{this.props.Name}</samp>
               </h5>
           </div>
       );
   } 
}