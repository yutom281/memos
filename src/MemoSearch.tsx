import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 1000;

interface Memo {
  _id: number;
  date: string;
  topic: string;
  Good_Bad: string;
  cause: string;
  lesson: string;
};

type MemoSearchState = {
  memos: Memo[],
  searchValue: string,
  index: number,
  // showRemoveIcon: boolean,
};

class MemoSearch extends React.Component {
  state: MemoSearchState = {
    memos: [],
    searchValue: "",
    index: 0,
    // showRemoveIcon: false,
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        memos: [],
        index: 0,
        // showRemoveIcon: false
      })
    } else {
      Client.search(value, memos => {
        this.setState({
          memos: memos.slice(0, MATCHING_ITEM_LIMIT)
        })
      })
      // this.setState({
      //   showRemoveIcon: true
      // })
    };
  };

  handleSearchNext = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || this.state.memos.length === 0) {
      return;
    }

    const { memos, index } = this.state;
    this.setState({
      index: index >= memos.length -1 ? 0 : index +1
    })
  };

  handleSearchCancel = () => {
    this.setState({
      memos: [],
      searchValue: "",
      index: 0,
      // showRemoveIcon: false,
    });
  };
  
  render() {
    const { memos, index } = this.state;
    const memo = memos[index];

    return (
      <div>
        <input
          title="search bar"
          type="text"
          onChange={this.handleSearchChange}
          onKeyUp={this.handleSearchNext}
        />

        <ul>
          {memos.length > 0 &&
            <li key={memo._id}>
              <strong>{memo.topic}</strong> - {memo.lesson}
            </li>
          }
        </ul>
      </div>
    );
  };
}

export default MemoSearch;
