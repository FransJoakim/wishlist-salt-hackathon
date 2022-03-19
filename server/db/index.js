const fs = require('fs/promises');
const uuid = require('uuid');

const db = async () => fs.readFile(__dirname + '/mockUserData.json', 'utf8')

const authenticateUser = async (username) => {
  const allUsers = await db()
  const userData = JSON.parse(allUsers).find(user => user.username === username);

  if (!userData) {
    return false
  }

  return { allUsers, userId: userData.user_id }
}

const addlistitem = async (userId, newItem) => {
  newItem.item_id = uuid.v4()

  const allUsers = await db();
  const parsedData = await JSON.parse(allUsers);
  const newData = await parsedData.map(user => {
    if (user.user_id !== userId) return user;
    user.lists[0].items.push(newItem)
    return user
  })
  console.log(newData)
  await fs.writeFile(__dirname + '/mockUserData.json', JSON.stringify(newData));
  const updatedData = await db();
  return updatedData
}


const addGifter = async (userId, body) => {
  const allUsers = await db();
  const parsedData = await JSON.parse(allUsers)
  const newData = await parsedData.map(user => {
    if (user.user_id !== userId) return user;
    user.lists[0].items.forEach(item => {
      if(item.item_id === body.itemId) {
        if(!item.gifter.some(gifter => gifter === body.giftersId)) {
          item.gifter.push(body.giftersId)
          item.numberofGifters++
        }
      }
      console.log(item)
    });
    return user
  })
  await fs.writeFile(__dirname + '/mockUserData.json', JSON.stringify(newData));
  const updatedData = await db();
  return updatedData
}

const addInterestedGifter = async (userId, body) => {
  const allUsers = await db();
  const parsedData = await JSON.parse(allUsers)
  const newData = await parsedData.map(user => {
    if (user.user_id !== userId) return user;
    user.lists[0].items.forEach(item => {
      if(item.item_id === body.itemId) {
        if(!item.interestedGifters.some(interestedgifter => interestedgifter === body.giftersId)) {
          item.interestedGifters.push(body.giftersId)
          item.numberofInterestedGifters++
        }
      }
      console.log(item)
    });
    return user
  })
  await fs.writeFile(__dirname + '/mockUserData.json', JSON.stringify(newData));
  const updatedData = await db();
  return updatedData
}

module.exports = {
  // getUserData,
  authenticateUser,
  addGifter,
  addInterestedGifter,
  addlistitem
}