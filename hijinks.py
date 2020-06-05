#!/usr/bin/python3
from random import randint

starting_player = 1
board_length = 3
# setup board
board = [[ [], [], [] ],
    [ [3,2,1], [3,2,1], [3,2,1] ],
    [ [], [], [] ]]
# board = [[ [3,2,1], [3,2,1], [3,2,1] ],
#     [ [], [], [] ],
#     [ [], [], [] ]]

def show_board(board=board, player=1):
    print()             # print empty line to make it more readable
    if player == 2:
        for x in reversed(board):
            for i in reversed(x):
                print(i, end='')
            print()
    else:
        for x in board:
            print(x)

def dice_roll():
    roll = randint(1,3)
    print("You rolled a " + str(roll))
    return roll

def move_pyramids(from_x, from_y, quantity, direction, player):
    ''' Some important rules
        - You can't move a pyramid on top of a smaller pyramid
        - You can't move a pyramid FROM your opponent's homerow 
    '''

    _fromspace = board[from_x][from_y]
    to_x = from_x
    to_y = from_y

    if direction == "up":
        to_x -= 1
    elif direction == "down":
        to_x += 1
    elif direction == "left":
        to_y -= 1
    elif direction == "right":
        to_y += 1

    def able_to_move_pieces():
        # Make sure you aren't trying to move more pieces that are in that space
        if quantity > len(_fromspace):
            print("You can't move {} pieces from that space".format(quantity))
            return False
        # Not allowed to move pieces from your oppoent's homerow
        fromspace_in_opponents_homerow = True if (player == 1 and from_x == 0) or (player == 2 and from_x == 2) else False
        if fromspace_in_opponents_homerow:
            print("Can't move pieces from opponent's homerow")
            return False
        destination_on_board = True if ( 0 <= to_x <= 2 ) and ( 0 <= to_y <= 2 ) else False
        if not destination_on_board:
            print("Have to move to a valid space")
            return False
        # bottom piece to move not bigger than top piece of desination
        destination_empty = True if len(board[to_x][to_y]) == 0 else False
        if not destination_empty:
            if board[from_x][from_y][-quantity] > board[to_x][to_y][-1]:
                print("Can't move a piece on top of a smaller piece")
                return False
        return True

    if able_to_move_pieces():
        # Move the pieces
        _tospace = board[to_x][to_y]
        pieces_to_move = []
        for piece in range(quantity):               # put pieces in stack
            pieces_to_move.append(_fromspace.pop())
        for piece in range(quantity):               # pop them out of the stack to new space
            _tospace.append(pieces_to_move.pop())
        return 'moved'
    else:
        print("Can't move that way.")
        return 'not moved'

def convert_values_to_int(values):
    # convert each value in array to int
    pass

def is_valid_move(x, y, quantity, direction, num_moves_left):

    # quantity can't be more than moves left
    if quantity > num_moves_left:
        return False
    # x and y can't be out of bounds
    elif not 0 <= x <= board_length or not 0 <= y <= board_length:
        return False
    # direction has to be defined
    elif direction not in ['up','down','left','right']:
        print("Not a valid direction.")
        return False
    else:
        return True

def end_game(winner):
    print("Congratulations, player {} is the winner".format(winner))
    exit()

def check_for_winner(board):
    winner = None
    player_homerows = [board[-1], board[0]]

    for player_index, homerow in enumerate(player_homerows):
        player = player_index + 1

        all3_spaces_same = True if homerow[0] == homerow[1] == homerow[2] else False

        if len(homerow[0]) == 1 and all3_spaces_same:
            winner = player
        elif homerow == [[3,2,1], [3,2,1], [3,2,1]]:
            winner = other_player(player)

    if winner != None:
        end_game(winner)


def do_players_moves(player, num_moves_left):

    command = input("You have {} moves left.\nYour move > ".format(num_moves_left))
    # check if command fits format
    x, y, quantity, direction = command.split()
    x = int(x)
    y = int(y)
    quantity = int(quantity)        # use convert_values_to_int function
    move = (x, y, quantity, direction)

    if is_valid_move(x, y, quantity, direction, num_moves_left):
        move_status = move_pyramids(x, y, quantity, direction, player)
        check_for_winner(board)
        if move_status == 'moved':
            show_board(board)
            num_moves_left -= quantity

    if num_moves_left > 0:
        do_players_moves(player, num_moves_left)


def other_player(player):
    return 1 if player == 2 else 2

def play_game():
    player = starting_player
    show_board(board)
    while True:
        print("Player {}'s turn".format(player))
        num_moves_left = dice_roll()
        do_players_moves(player, num_moves_left)
        player = other_player(player)

if __name__ == "__main__":
    play_game()
