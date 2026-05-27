import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("stores a session and calls onLogin after a valid login submit", () => {
    const onLogin = vi.fn();

    render(<LoginPage onLogin={onLogin} />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(window.localStorage.getItem("frontend-task:session")).toBe("true");
    expect(onLogin).toHaveBeenCalledTimes(1);
  });

  it("does not submit when required fields are empty", () => {
    const onLogin = vi.fn();

    render(<LoginPage onLogin={onLogin} />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(window.localStorage.getItem("frontend-task:session")).toBeNull();
    expect(onLogin).not.toHaveBeenCalled();
  });
});
