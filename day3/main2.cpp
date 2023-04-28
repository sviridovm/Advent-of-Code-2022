
#include <iostream>
#include <string>
#include <fstream>
#include <map>
#include <vector>

using namespace std;

string findSmallestSack(vector <string> &sacks){
    string smallestSack = sacks[0];
    for(auto &it : sacks){
        if(it.length() < smallestSack.length()){
            smallestSack = it;
        }
    }
    return smallestSack;
}


bool findChar(string& s, char c){
    for(char &it : s){
        if(it == c){
            return true;
        }
    }
    return false;
}

int main()
{   
    
    //create a map that assigns all upper and lower case letters a priority
    map <char, int> letterWeights;
    for(int i = 0; i < 26; i++)
    {
        letterWeights.insert(pair<char, int>('a' + i, i + 1));
    }
    for(int i = 0; i < 26; i++)
    {
        letterWeights.insert(pair<char, int>('A' + i, i + 27));
    }


    ifstream fin ("input.txt");
    if(!fin)
    {
        cout << "Error opening file";
        return 1;
    }

    // I hate pointe decay 😿
    vector <vector <string>> rucksackGroups;
    string line;
    int count = 0;
    vector <string> rucksackGroup;
    while(getline(fin, line))
    {
        rucksackGroup.push_back(line);   
        if (count%3 == 2)
        {
            rucksackGroups.push_back(vector(rucksackGroup)); // copy constructor bc deep copy
            rucksackGroup.clear();
        }
        count++;
        
    }


    vector <char> commonChars;
    int shortestLength;
    for(auto &it : rucksackGroups){
        string smallestSack = findSmallestSack(it);
        shortestLength = smallestSack.length();
        for(int i = 0; i < shortestLength; i++){
        char searchChar = smallestSack[i];
        if(findChar(it[0], searchChar) && findChar(it[1], searchChar) && findChar(it[2], searchChar)) 
        {   // optimization could be made if you determine index of the sacks that are not the smallest sack
            commonChars.push_back(searchChar);
            break;
        }
        }
    }

    

    int prioritySum = 0;
    for(auto &it : commonChars)
    {
        prioritySum += letterWeights[it];
    }
    
    cout << prioritySum << endl; 


    return 0;
}



