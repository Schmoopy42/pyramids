#!/usr/bin/python3
from random import randint

# setup board
#board = [[ [], [], [] ],
#    [ [3,2,1], [3,2,1], [3,2,1] ],
#    [ [], [], [] ]]
board = [[ [3,2,1], [3,2,1], [3,2,1] ],
    [ [], [], [] ],
    [ [], [], [] ]]

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
    return randint(1,3)

def move_pyramids(from_x, from_y, quantity, direction):
    ''' Some important rules
        - You can't move a pyramid on top of a smaller pyramid
        - You can't move a pyramid FROM your opponent's homerow 
    '''
    _possible_directions = ['up','down','left','right']

    _fromspace = board[from_x][from_y]
    to_x = from_x
    to_y = from_y

    if direction not in _possible_directions:
        print("Not a valid direction.")
    else:
        if direction == "up":
            to_x -= 1
        elif direction == "down":
            to_x += 1
        elif direction == "left":
            to_y -= 1
        elif direction == "right":
            to_y += 1

    # check to make sure no values are negative
    if ( 0 <= to_x <= 2 ) and ( 0 <= to_y <= 2 ):
        _tospace = board[to_x][to_y]
        _pyramid = _fromspace.pop()
        _tospace.append(_pyramid)
    else:
        print("Can't move that way.")

def parse_command(command):
    pass

def check_for_winner(board):
    player_homerow = [board[0], board[-1]]

    for player_index, homerow in enumerate(player_homerow):
        player = player_index + 1

        all3_spaces_same = True if homerow[0] == homerow[1] == homerow[2] else False

        if len(homerow[0]) == 1 and all3_spaces_same:
            return player
        elif homerow == [[3,2,1], [3,2,1], [3,2,1]]:
            return other_player(player)


def other_player(player):
    return 1 if player == 2 else 2

def run():
    winner = None
    player = 1
    # move_pyramids(1,2,1,'down')
    while winner == None:
        print("player is " + str(player))
        num_of_moves = dice_roll()
        print("You rolled a " + str(num_of_moves) + " so you can move " + str(num_of_moves) + " times.")
        show_board(board, player)

        parse_command(input("> "))
        winner=check_for_winner(board)
        player = other_player(player)
    
    print("Congratulations, player {} is the winner".format(winner))

if __name__ == "__main__":
    run()




