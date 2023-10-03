//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8; //latest version of solidity is 0.8.20
// to specify okay with new version ^ this means any version from 0.8.10 to above will be okay
// >=0.8.7 <0.9.0 --> comiper between them will work

contract SimpleStorage{
    // Initializing favoriteNumber
    uint256 favoriteNumber; //default value will be 0

    mapping(string => uint256) public nameToFavoriteNumber;

    //new type of People or People type
    struct People{
        uint256 favoriteNumber;
        string name;
    }

    //Array of new type People
    People[] public people; 

    function store(uint256 num) public virtual{
        favoriteNumber = num;    
    }

    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    //calldata, memory, storage
    function addPerson(string memory _name, uint256 _favoriteNumber) public{
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
