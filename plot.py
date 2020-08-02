import matplotlib.pyplot as plt
from datetime import datetime
import numpy as np


X={}
Y={}

f = open("test.csv", "r")
i=0
for x in f:
    if i==0:
        i=1
        continue
    line= x.split(",")
    date = line[0].strip()
    time =line[1].strip()
    date_and_time= datetime.strptime(date+" "+time, '%d/%m/%Y %H:%M:%S')
    status = line[2].strip()
    name =line[3].strip()
    if name in X:
        X[name].append(date_and_time)
        Y[name].append(status)
    else:
        X[name]=[date_and_time]
        Y[name]=[status]
  

print X

all_persons=""
for person in X:
    all_persons += person +", "
    x = np.array(X[person])
    y = np.array(Y[person])
    plt.plot(x,y,marker='o',linestyle='-',label = person,drawstyle='steps-post')


plt.xlabel('Time data')
plt.ylabel('isOnline')
plt.ylim(0, 2)
# plt.xticks(rotation=90)
plt.gcf().autofmt_xdate()
plt.title('Online status graph for '+all_persons[:-2])
plt.legend()
plt.show()