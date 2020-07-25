# StalkOnWhatsapp

This can be used to track online status of a contact , visualize online history, and see if two people were chatting together by checking overlap in their online graph.

## Steps to follow.

- Open whatsapp web and open console in the browser. (Eg : For chrome browser use the shortcut Option + ⌘ + J (on macOS), or Shift + CTRL + J (on Windows/Linux).)
- In the console, paste the contents of [stalk.js](src/stalk.js) and hit enter.
- A popup will come up asking the names of contact you want to stalk. (You can eneter multiple names separated by comma(,). Make sure that names are typed exactly same way the contact is saved(case sensitive). The contact to stalk should not be presnt very below in chat, can pin the person to top if chat has gone down.) [Sample](/images/contactnames.png)
- This would start checking online status of these contacts and store online history of the persons being stalked. [Sample](/images/sample_data.png)
- Click on GetStalkCSV in the UI to download the colleted data. [Sample](/images/download.png)
- Update contents of test.csv with the downloaded data.
- Run [plot.py](src/plot.py) (using command `python plot.py`) to see online status of the target. ![GitHub Logo](/images/onlinegraph.png)

Happy Stalking !! 

## Credits
- Contributor: https://www.linkedin.com/in/suryakant-pandey/