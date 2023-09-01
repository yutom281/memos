import React from "react";
import Client from "./Client";
import utilStyles from "../styles/utils.module.css";

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
};

class MemoSearch extends React.Component {
  state: MemoSearchState = {
    memos: [],
    searchValue: "",
    index: 0,
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
      })
    } else {
      Client.search(value, memos => {
        this.setState({
          memos: memos.slice(0, MATCHING_ITEM_LIMIT)
        })
      })
    };
  };

  handleSearchNext = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || this.state.memos.length === 0) {
      return;
    }

    const { memos, index } = this.state;
    this.setState({
      index: index >= memos.length - 1 ? 0 : index + 1
    })
  };

  handleSearchCancel = () => {
    this.setState({
      memos: [],
      searchValue: "",
      index: 0,
    });
  };

  render() {
    const { memos, index } = this.state;
    const memo = memos[index];

    return (
      <div>
        <section className={utilStyles.container}>
          <input
            className={utilStyles.textbox}
            title="search bar"
            type="text"
            onChange={this.handleSearchChange}
            onKeyUp={this.handleSearchNext}
          />
        </section>
        {memos.length > 0 &&
          <section className={utilStyles.containerLeft}>
            <p>
              <strong>{index + 1}. {memo.topic}</strong>
              <br />
              {memo.lesson}
            </p>
            {/* <ul>
              <li key={memo._id}>
                {memo.topic} - {memo.lesson}
              </li>
            </ul> */}
          </section>
        }
      </div>
    );
  };
}

export default MemoSearch;
