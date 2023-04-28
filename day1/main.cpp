
#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <map>
#include <climits>
#include <set>
#include <algorithm>

int findMax(std::map<int, int> &map){
    int max = INT_MIN;
    for(auto &it: map){
        if(it.second > max){
            max = it.second;
        }
    }
    return max;

}

void printMap(std::map<int, int> &map){
    for(auto &it: map){
        std::cout << it.first << " " << it.second << std::endl;
    }
}

int main(){

    std::string filename = "input.txt";
    std::ifstream fin;
    fin.open(filename);

    if(!fin){
        std::cout << "Error opening file " << filename << std::endl;
        return 1;
    }

    int sum = 0;
    std::string line;
    int elfNumber = 0;
    std::vector<int> cals;
    int count = 0;
    while (std::getline(fin, line))
    {
        if(line.size() == 0){
            cals.push_back(sum);
            sum = 0;
            elfNumber++;
        }
        else{
            sum += std::stoi(line);
        }
        count++;
    }
    cals.push_back(sum);
    std::cout << "Lines processed: " << count << std::endl;
  

    std::sort(cals.begin(), cals.end());

    std::cout << "Last element: " << cals[cals.size() - 1] << std::endl;

    int biggestThreeSum = 0;
    for(int i = 0; i < 3; i++){
        biggestThreeSum += cals[cals.size() - 1 - i];
    }
    
    std::cout << "sum of biggest three: " << biggestThreeSum << std::endl;  



    return 0;
}

