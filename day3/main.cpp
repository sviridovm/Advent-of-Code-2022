
#include <iostream>
#include <string>
#include <fstream>
#include <map>
#include <vector>

using namespace std;



int main()
{   
    
    map <char, int> letterWeights;
    for(int i = 0; i < 26; i++)
    {
        letterWeights.insert(pair<char, int>('a' + i, i + 1));
    }
    for(int i = 0; i < 26; i++)
    {
        letterWeights.insert(pair<char, int>('A' + i, i + 27));
    }

    string line;
    ifstream fin ("input.txt");
    if(!fin)
    {
        cout << "Error opening file";
        return 1;
    }

    string rucksackFirstHalf;
    string rucksackSecondHalf;
    vector <pair<string, string>> rucksacks;
    int length;
    while(getline(fin, line))
    {
        length = line.length();
        rucksackFirstHalf = line.substr(0, length / 2);
        rucksackSecondHalf = line.substr(length / 2);
        rucksacks.push_back(pair<string, string>(rucksackFirstHalf, rucksackSecondHalf));
    }
    // add another getLine for last line? 

    char commonChar;
    vector <char> commonChars;
    for(auto &it : rucksacks){
        for(int i = 0; i < it.first.length(); i++)
        {
            if(it.first.find(it.second[i]) != std::string::npos)
            {
                commonChar = it.second[i];
                commonChars.push_back(commonChar);
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



