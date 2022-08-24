const db = require('../../models/index');
const dotenv = require('dotenv');
dotenv.config();

class isMenuEnableService {
    setIsMenuEnable= async({menuType,enable})=>{
        if(!menuType||typeof enable !== "boolean"){
            throw Error('not found data')
        }
        const findIsMenuEnable = await db.IsMenuEnable.findOne({ where: { menuType: menuType } });
        if(findIsMenuEnable&&Object.keys(findIsMenuEnable)){
            const updateIsMenuEnable = await db.IsMenuEnable.update({enable:enable},{ where: { menuType: menuType } });
            return updateIsMenuEnable
        }
        const res = await db.IsMenuEnable.create({
            enable: enable,
            menuType: menuType
        });
      if(!Object.keys(res).length){
        throw Error('fail to create isMenuEnable')
      }
      return res
    }
    getAllMenuEnables = async () => {
    try {
        const findIsMenuEnables = await db.IsMenuEnable.findAll({ where: { enable: true } });
      if (!findIsMenuEnables||!findIsMenuEnables.length) {
        return {};
      }
      return findIsMenuEnables;
    } catch (error) {
      console.log('error:', error);
    }
  };
  getAllMenus = async () => {
    try {
        const findIsMenus = await db.IsMenuEnable.findAll();
      if (!findIsMenus||!findIsMenus.length) {
        return {};
      }
      return findIsMenus;
    } catch (error) {
      console.log('error:', error);
    }
  };
}

module.exports = isMenuEnableService;
