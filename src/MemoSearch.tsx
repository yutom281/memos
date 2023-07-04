import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

interface Memo {
  _id: number;
  date: string;
  topic: string;
  Good_Bad: string;
  cause: string;
  lesson: string;
}

class MemoSearch extends React.Component {
  state = {
    memos: [],
    searchValue: "",
    showRemoveIcon: false,
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        memos: [],
        showRemoveIcon: false
      })
    } else {
      this.setState({
        showRemoveIcon: true
      })

      Client.search(value, memos => {
        this.setState({
          memos: memos.slice(0, MATCHING_ITEM_LIMIT)
        })
      })
    };
  };

  handleSearchCancel = () => {
    this.setState({
      memos: [],
      searchValue: "",
      showRemoveIcon: false,
    });
  };
  
  render() {
    const { memos } = this.state;

    return (
      <div>
        <input
          title="search bar"
          type="text"
          onChange={this.handleSearchChange}
        />

        <ul>
          {memos.map((m: Memo) => (
            <li key={m._id}>
              <strong>{m.topic}</strong> - {m.lesson}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MemoSearch;
