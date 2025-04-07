const msgModel = require("../model/msgModel");

module.exports.addMessage = async(req,res,next)=>{
    try{
        const {from,to,message} = req.body;
        const data = await msgModel.create({
            message:{text:message},
            users:{from,to},
            sender:from,
        });
        if(data)return res.json({msg: "Message Added Succesfully,"});
        return res.json({msg: "Failed to add message"})
    }catch(ex){
        next(ex);
    }
};
// module.exports.getAllMessage = async(req,res,next)=>{
//     try{
//         const{from,to} = req.body;
//         const messages = await msgModel.find({
//             users:{
//                 $all:[from,to],
//             },
//      })
//      .sort({updatedAt :1});
//      const projectedMessages = messages.map(()=>{
//         return{
//             fromSelf : msg.sender.toString() ===from,
//             message:msg.message.text,

//         };
//      });
//      res.json(projectedMessages)
//     }catch(ex){
//         next(ex);
//     }
// };
module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      console.log("Fetching messages for:", { from, to }); // Debugging
  
      const messages = await msgModel.find({
        $or: [
          { sender: from, "users.to": to },
          { sender: to, "users.to": from },
        ],
      }).sort({ updatedAt: 1 });
  
      console.log("Messages found in DB:", messages); // Debugging
  
    //   const projectedMessages = messages.map((message) => {
    //     return {
    //       fromSelf: message.sender.toString() === from,
    //       message: message.message.text,
    //     };
    //   });
    const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      
  
      res.json(projectedMessages);
    } catch (ex) {
      console.error("Error in getAllMessage:", ex);
      next(ex);
    }
  };
  