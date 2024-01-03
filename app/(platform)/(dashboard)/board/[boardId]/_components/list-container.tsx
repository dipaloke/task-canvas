"use client";

import { toast } from "sonner";

import { useEffect, useState } from "react";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";

import { updateCardOrder } from "@/actions/update-card-order";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

// generic reorder function(reordering with index)

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  //storing the lists locally to add drag and drop feature.(we first change locally then the database)
  const [orderedData, setOrderedData] = useState(data);

  //Using the updateListOrder action
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  //Using the updateCardOrder action
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //if the card or list is picked up and dropped in the same position.Then do nothing.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //if user is moving a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);

      //Trigger server action.
      executeUpdateListOrder({ items, boardId });
    }

    // if user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      //source and destination list

      //comparing the list id from the newOrderedList with the source droppable and destination droppable
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      //if source list or destinationList wasn't found
      if (!sourceList || !destList) {
        return;
      }

      //check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      //check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      //Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        //Trigger server action
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });

        //USer moves the card to another list
      } else {
        //Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        //Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        //Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);

        //Trigger Server Action
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            {/* represents the empty space at the end of the x axis */}
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
