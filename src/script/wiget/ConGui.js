import { banana } from '../banana';
import { dat } from '../../libs/dat.gui.min';



class Dat{

	constructor (){

		var controls = new function (){

			this.name = 'dat.gui.controls';

			banana.publish('Controls',this);

		};
		
		var gui = new dat.GUI();
		banana.publish('Gui', gui, controls);

	}
}

export { Dat }